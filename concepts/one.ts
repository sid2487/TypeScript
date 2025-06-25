// ts in react

// types component props(manual props typing)

type ButtonProps = {
  text: string;
  onClick: () => void;
};

const Button = ({ text, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{text}</button>;
};


const [count, setCount] = useState<number>(0);
const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
const [user, setUser] = useState<User | null>(null);


// typin useRef
const inputRef = useRef<HTMLInputElement>(null);

<input ref={inputRef} />;



// 6. Typing Events (Form, Input, Mouse)
const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

// Event Type	                                 For HTML Element
// React.ChangeEvent<HTMLTextAreaElement>	     <textarea>
// React.MouseEvent<HTMLButtonElement>	         <button>
// React.FormEvent<HTMLFormElement>	                <form>
// React.KeyboardEvent<HTMLInputElement>	    Keyboard input in <input>
  

// 7. Typing Children Props(react node means “You can pass anything that can be rendered in React.”)
type CardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
  return <div>{children}</div>;
};



// 8. Typing API Response
type User = {
  id: string;
  email: string;
};

type ApiResponse = {
  message: string;
  data: User;
};

const fetchUser = async (): Promise<ApiResponse> => {
  const res = await fetch("/api/user");
  return res.json();
};

// 10. Typing Forms & Validation
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const { register, handleSubmit } = useForm<FormData>();

const onSubmit = (data: FormData) => {
  console.log(data);
};

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register("email")} />
  <input {...register("password")} />
  <button type="submit">Submit</button>
</form>;



//  Typing with React Router (v6+)
import { useParams } from "react-router-dom";

type RouteParams = {
  id: string;
};

const Page = () => {
  const { id } = useParams<RouteParams>();
  return <div>Product ID: {id}</div>;
};


  

  