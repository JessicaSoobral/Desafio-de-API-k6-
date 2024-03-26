
import http from 'k6/http';
import { check } from 'k6';

const dados = {
   'email': "fulano@qa.com",
   'password': "teste"
}

export default function login() {

    const BASE_URL = 'https://serverest.dev';
    
    const header ={
        'headers': {
            'Contant-Type': 'application/json' 
        }
    }
    const res = http.post(`${BASE_URL}/login`, dados, header);
    
    check(res, {
    'Login status code 200': (r) => r.status === 200,
    'Login realizado com sucesso': (r) => r.body.includes("Login realizado com sucesso"),
  })
}
