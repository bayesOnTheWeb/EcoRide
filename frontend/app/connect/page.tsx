import Footer from "../src/container/footer";
import Header from "../src/container/header";
import LoginForm from "../src/container/loginForm";

export default function Page(){
    return(
        <>
        <Header />
        <div className="pb-60 sm:pb-0">
        <LoginForm />
        </div>
        <Footer />
        </>
    );
}
