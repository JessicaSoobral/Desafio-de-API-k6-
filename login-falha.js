
import http from 'k6/http';
import { check } from 'k6';

const dados = {
   'email': "jessica2@qa.com.br",
   'password': "123456"
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
    'Login status code 401': (r) => r.status === 401,
    'Login realizado com falha': (r) => r.body.includes("Email e/ou senha inválidos"),
  })
}
