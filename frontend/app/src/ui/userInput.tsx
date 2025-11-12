interface UserInputProps{
    label:string
    type: "email" | "text" | "password" | "tel"
    name:string
    placeholder : string
}

export default function UserInput({label , type , name , placeholder} : UserInputProps ){
    return(
        <>
        <div className="flex flex-col gap-1">
        <label className="text-primary" htmlFor={name}>{label}</label>
        <input className="placeholder-gray-400 border-b-2 border-primary max-w-1/4" id={name} name={name} type={type} placeholder={placeholder}/>
        </div>
        </>
    );
}