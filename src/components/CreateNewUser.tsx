import { useUserActions } from "@/hooks";
import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { toast } from "sonner";

export const CreateNewUser = () => {
	const { createUser } = useUserActions();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setResult(null);

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		if (!name || !email || !github) {
			setResult("ko");
			return;
		}

		const user = {
			name,
			email,
			github,
		};

		// const data = Object.fromEntries(formData.entries());
		// const user = {
		// 	name: data.name as string,
		// 	email: data.email as string,
		// 	github: data.github as string,
		// };
		createUser(user);
		setResult("ok");
		toast.success("User created successfully");
		form.reset();
	};

	return (
		<Card
			style={{
				display: "flex",
				flexDirection: "column",
				rowGap: "16px",
				marginBottom: "32px",
			}}
		>
			<Title>Create New User</Title>
			<form
				style={{ display: "flex", flexDirection: "column", rowGap: "16px" }}
				onSubmit={handleSubmit}
			>
				<TextInput autoFocus type="text" placeholder="Name" name="name" />
				<TextInput type="text" placeholder="Email" name="email" />
				<TextInput type="text" placeholder="Github" name="github" />
				<Button type="submit">Create</Button>
				<div>
					{result === "ok" && (
						<Badge color="green">User created successfully</Badge>
					)}
					{result === "ko" && (
						<Badge color="red">Please fill all the fields</Badge>
					)}
				</div>
			</form>
		</Card>
	);
};
