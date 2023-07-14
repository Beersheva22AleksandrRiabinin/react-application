import { useDispatch } from "react-redux";
import SignInForm from "../forms/SignInForm";
import LoginData from "../../model/LoginData";
import { authService } from "../../config/service-config";
import UserData from "../../model/UserData";
import { authActions } from "../../redux/slices/authSlice";
import CodePayload from "../../model/CodePayload";
import CodeType from "../../model/CodeType";
import { codeActions } from "../../redux/slices/codeSlice";

const SignIn: React.FC = () => {
    const dispatch = useDispatch();

    async function loginSubmitFn(loginData: LoginData) {
        const res: UserData = await authService.login(loginData)
        res && dispatch(authActions.set(res))

        const alert: CodePayload = { code: CodeType.OK, message: '' }
        alert.code = res ? CodeType.OK : CodeType.SERVER_ERROR
        alert.message = res ? 'Welcome' : 'Incorrect Credentials'
        dispatch(codeActions.set(alert))
    }

    function registerSubmitFn(newUser: UserData) {
        authService.registerNewUser(newUser)
        //todo registerNewUser should return something
        //todo alert message
        //oooor auto login after registration
    }

    return <SignInForm
        loginSubmitFn={loginSubmitFn}
        registerSubmitFn={registerSubmitFn}
    />
}

export default SignIn;