export declare const registerUser: (name: string, email: string, password: string) => Promise<import("mongoose").Document<unknown, {}, import("./user.model").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.model").IUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const loginUser: (email: string, password: string) => Promise<{
    user: import("mongoose").Document<unknown, {}, import("./user.model").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.model").IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    };
    token: string;
}>;
