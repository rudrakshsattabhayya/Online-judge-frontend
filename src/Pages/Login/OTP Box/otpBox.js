import "./otpBox.css";

const OTPBox = () => {
  return (
    <form class="form">
      <div class="info">
        <span class="title">OTP Verification</span>
        <p class="description">Please enter the code we have sent you. </p>
      </div>
      <div class="inputs">
        <input placeholder="" type="tel" maxlength="1" />
        <input placeholder="" type="tel" maxlength="1" />
        <input placeholder="" type="tel" maxlength="1" />
        <input placeholder="" type="tel" maxlength="1" />
      </div>
      <a class="validate" href="#">
        Verify
      </a>
      <p class="resend">
        You don't receive the code ?<a class="resend-action">resend</a>
      </p>
    </form>
  );
};

export default OTPBox;
