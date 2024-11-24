export class MyHttpError extends Error
{
	constructor(code, message) {
		super(message);
		this.code = code ?? 500;
		this.message = message ?? "Erreur inconnue";
	}
}

export class MyError extends Error
{
	constructor(callerCode, message)
	{
		super(message);
		this.callerCode = callerCode ?? -1;
		this.message = message ?? "Erreur inconnue";
	}
}