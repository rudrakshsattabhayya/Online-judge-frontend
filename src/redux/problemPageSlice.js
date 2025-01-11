import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../apis";
import STATUS from "../statuses";

export const problemThunk = createAsyncThunk(
    "problemPageSlice/problemThunk",
    async (problemId) => {
      try {
        const data = {
          questionId: problemId
        };
  
        return post("show-problem", data).then(async (res) => {
          const obj = {
            data: res.data,
            error: res.error,
          };
          if(!res.error){
            let link = res.data.response.problemsData.problemStatement;
            const problemStatementLink = link?.substring(0, 4) !== "http"? process.env.REACT_APP_SUBMISSION_FILE_URL + link : link;
            await fetch(problemStatementLink)
            .then(response => response.text())
            .then(textContent => {
              const formattedTextContent = textContent.replace(/\n/g, '<br>');
              res.data.response.problemsData.problemStatement = formattedTextContent;
            })
            .catch(error => {
            console.error('Error fetching the text file:', error);
            });

            link = res.data.response.problemsData.visibleTestCases;
            const visibleTestCasestLink = link?.substring(0, 4) !== "http"? process.env.REACT_APP_SUBMISSION_FILE_URL + link : link;
            await fetch(visibleTestCasestLink)
            .then(response => response.text())
            .then(textContent => {
              const formattedTextContent = textContent.replace(/\n/g, '<br>');
              res.data.response.problemsData.visibleTestCases = formattedTextContent;
            })
            .catch(error => {
            console.error('Error fetching the text file:', error);
            });

            link = res.data.response.problemsData.visibleOutputs;
            const visibleOutputstLink = link?.substring(0, 4) !== "http"? process.env.REACT_APP_SUBMISSION_FILE_URL + link : link;
            await fetch(visibleOutputstLink)
            .then(response => response.text())
            .then(textContent => {
              const formattedTextContent = textContent.replace(/\n/g, '<br>');
              res.data.response.problemsData.visibleOutputs = formattedTextContent;
            })
            .catch(error => {
            console.error('Error fetching the text file:', error);
            });
          }
          return obj;
        });

      } catch (err) {
        console.log(err);
      }
    }
  );

export const showProblemSolutionThunk = createAsyncThunk(
    "problemPageSlice/showProblemSolutionThunk",
    async (problemId) => {
      try {
        const data = {
          questionId: problemId
        };
  
        return post("show-problem-solution", data).then((res) => {
          const obj = {
            data: res.data,
            error: res.error,
          };
          console.log(res)
          return obj;
        });
      } catch (err) {
        console.log(err);
      }
    }
  );

  export const submitSolutionThunk = createAsyncThunk(
    "problemPageSlice/submitSolutionThunk",
    async (data) => {
      try {
        return post("submit-problem", data).then((res) => {
          const obj = {
            data: res.data,
            error: res.error,
          };
          return obj;
        });
      } catch (err) {
        console.log(err);
      }
    }
  );

const problemPageSlice = createSlice({
  name: "problemPageSlice",
  initialState: {
    status: STATUS.IDLE,
    submitSolutionStatus: STATUS.IDLE,
    submissionMessage: null,
    data: null,
    problemsData: null,
    errorMsg: null,
    solution: null,
  },
  reducers: {
    removeErrorStatusForProblemPage: (state, action) => {
        state.status = STATUS.IDLE;
      },
    removeSuccessStatusFromSubmission: (status, action) => {
        status.submitSolutionStatus = STATUS.IDLE
    },
    setSolutionNull: (status, action) => {
        status.solution = null;
    }
  },
  extraReducers: {
    
    [problemThunk.pending]: (state, action) => {
        state.status = STATUS.LOADING;
      },
      [problemThunk.fulfilled]: (state, action) => {
        const { error, data } = action.payload;
        if (error) {
          state.errorMsg = data.message;
          state.status = STATUS.ERROR;
        } else {
          state.data = data.response;
          state.problemsData = data.response.problemsData
          let problem = data.response.problemsData;
          if(problem.difficulty === 1){
            state.problemsData.difficulty = "Easy"
          }else if (problem.difficulty === 2){
            state.problemsData.difficulty = "Medium"
          }else {
            state.problemsData.difficulty = "Hard"
          }

          if (problem.totalSubmissions === 0){
            state.problemsData.successRate = "0%";
          }else{
            let rate = parseInt(100*(problem.acceptedSubmissions/problem.totalSubmissions));
            state.problemsData.successRate = `${rate}%`;
          }
          
          state.status = STATUS.IDLE;
        }
      },
      [problemThunk.rejected]: (state, action) => {},

      [showProblemSolutionThunk.pending]: (state, action) => {
        console.log("Pending")
        state.status = STATUS.LOADING;
      },
      [showProblemSolutionThunk.fulfilled]: (state, action) => {
        console.log("fulfilled: ", action.payload)
        const { error, data } = action.payload;
        if (error) {
          state.errorMsg = data.message;
          state.status = STATUS.ERROR;
        } else {
          state.solution = data.solution;
          state.status = STATUS.IDLE;
        }
      },
      [showProblemSolutionThunk.rejected]: (state, action) => {},

      [submitSolutionThunk.pending]: (state, action) => {
        state.submitSolutionStatus = STATUS.LOADING;
      },
      [submitSolutionThunk.fulfilled]: (state, action) => {
        const { error, data } = action.payload;
        if (error) {
          state.errorMsg = data.message;
          state.submitSolutionStatus = STATUS.ERROR;
        } else {
          state.submissionMessage = data.verdict;
          state.submitSolutionStatus = STATUS.SUCCESS;
        }
      },
      [submitSolutionThunk.rejected]: (state, action) => {},

      },
      
});

export const { removeErrorStatusForProblemPage, removeSuccessStatusFromSubmission, setSolutionNull } = problemPageSlice.actions;
export default problemPageSlice.reducer;
