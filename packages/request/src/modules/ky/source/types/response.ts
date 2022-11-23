export interface RequestResponse extends Response {
	json: <T = unknown>() => Promise<T>;
}
