
const key = `flashauth_jwt`

export const Storage ={
    SaveToken(value:string):void{
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.log("Failed to save token");
        }
    }

    GetToken():string{
        try {
            
        } catch (error) {
            
        }
    }
}