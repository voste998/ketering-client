export default class ApiResponse{
    status:"ok"|"login"|"error";
    data:any;
    constructor(status:"ok"|"login"|"error",data?:any){
        this.status=status;
        this.data=data;
    }
}