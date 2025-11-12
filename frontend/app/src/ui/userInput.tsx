

interface UserInputProps{ 
    label:string 
    type: "email" | "text" | "password" | "tel" | "confirmPassword" 
    name:string 
    placeholder : string 
    value: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; }

export default function UserInput({label, type, name, placeholder, value, onChange}: UserInputProps){
    return(
        <div className="flex flex-col gap-1">
            <label className="text-primary" htmlFor={name}>{label}</label>
            <input className="placeholder-gray-400 border-b-2 border-primary w-auto"
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}   
                onChange={onChange}  
            />
        </div>
    );
}
