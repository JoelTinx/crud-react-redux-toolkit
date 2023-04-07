import { CreateNewUser, ListOfUsers } from "@/components";
import { Toaster } from "sonner";
import "./App.css";
function App() {
	return (
		<>
			<CreateNewUser />
			<ListOfUsers />
			<Toaster richColors />
		</>
	);
}

export default App;
