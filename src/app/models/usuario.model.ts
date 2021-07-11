export class Usuario {

    constructor(
       //se acomodan por mas importantes arriba y opcionales abajo
        public nombre: string, 
        public email: string, 
        public password?: string,
        public img?: string,
        public google?: boolean, 
        public role?: string, 
        public uid?: string, 
    ){}

}