
const key = `flashauth_jwt`

export const Storage ={
    Set(value:string):void{
        try {
            localStorage.setItem(key, value)
        } catch (error) {
            
        }
    }
}