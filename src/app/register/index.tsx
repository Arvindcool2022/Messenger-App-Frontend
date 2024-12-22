import Register from "@/app/register/components/Register";
import Wrapper from "@/components/wrapper/wrapper";

const SignupPage = () => {
  console.log("a", import.meta.env.VITE_X);
  return (
    <Wrapper>
      <Register />
    </Wrapper>
  );
};

export default SignupPage;
