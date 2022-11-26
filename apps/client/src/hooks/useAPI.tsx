import type { SignInForm } from "../components/SignInForm";

export interface RegisterUserForm {
	name: string;
	email: string;
	password: string;
	groups: {
		supplier?: {
			name: string;
			cnpj: string;
		};
		provisions?: {
			type: { value: "Macarrão" | "Arroz" | "Feijão" }[];
		};
		cook?: {
			cri: string;
		};
	};
}

async function useAPI(data: SignInForm | RegisterUserForm, path: string) {
	const url = process.env.NEXT_APP_API_URL || "http://localhost:5000";
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	try {
		const response = await fetch(url + path, options);

		if (response.ok) {
			let data = null;
			try {
				data = await response.json();
			} catch (error) {
				console.error(error);
			}
			return data;
		}

		console.error(response);
		throw new Error("An unexpected error occurred while signing in.");
	} catch (error) {
		console.error(error);
		throw new Error("Network request failed.");
	}
}

export const useRegister = async (form: RegisterUserForm) => {
	return await useAPI(form, "/users/create");
};

export const useSignIn = async (form: SignInForm) => {
	return await useAPI(form, "/auth/sign-in");
};
