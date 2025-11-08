
const key = `flashauth_jwt`

export const Storage ={
    Set(value:string):void{
        try {
            localStorage.set(key)
        } catch (error) {
            
        }
    }
}