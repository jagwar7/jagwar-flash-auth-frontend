
const key = `flashauth_jwt`

export const Storage ={
    SaveToken(value:string):void{
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.log("Failed to save token");
        }
    },

    GetToken():string | null{
        try {
            const token = localStorage.getItem(key);
            return token;
        } catch (error) {
            return null
        }
    }
}