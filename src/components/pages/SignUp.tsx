import { useDispatch } from "react-redux"
import { authService } from "../../config/service-config"
import CodePayload from "../../model/CodePayload"
import CodeType from "../../model/CodeType"
import LoginData from "../../model/LoginData"
import UserData from "../../model/UserData"
import { authActions } from "../../redux/slices/authSlice"
import RegisterForm from "../forms/RegisterForm"

const SignUp: React.FC = () => {

    const dispatch = useDispatch()

    async function signUpSubmitFn(newUser: UserData) {

        const loginData: LoginData = await authService.registerNewUser(newUser)

        console.log(loginData)

        console.log(newUser)

        loginData.password == '' ? console.log('ok') : console.log('ne ok')

        const res: UserData = loginData.password == ''
            ?
            await authService.login({ email: 'GOOGLE', password: '' }) //in google case we have to use newUser fields
            :
            await authService.login(loginData)
        res && dispatch(authActions.set(res))

        const alert: CodePayload = { code: CodeType.OK, message: '' }
        alert.code = res ? CodeType.OK : CodeType.SERVER_ERROR
        alert.message = res ? 'Welcome' : 'Incorrect Credentials'
    }

    return <RegisterForm submitFn={signUpSubmitFn} />
}
export default SignUp


