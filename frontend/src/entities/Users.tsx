import Comment from "./comments.tsx";

export default interface User {
    _id: string;
    username: string;
    password: string
    isAdmin: boolean;
    comments: Comment[];
}
