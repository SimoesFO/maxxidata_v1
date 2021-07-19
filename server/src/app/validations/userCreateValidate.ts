import * as Yup from 'yup';

const userCreateSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('Este campo é obrigátorio'),
  password: Yup.string()
    .min(5, 'A senha deve ter entre 5 e 20 caracteres.')
    .max(20, 'A senha deve ter entre 5 e 20 caracteres.')
    .required('Este campo é obrigátorio'),
  cpf: Yup.string()
    .min(11, 'A senha deve ter 11 caracteres.')
    .max(11, 'A senha deve ter 11 caracteres.')
    .required('Este campo é obrigátorio'),
  address: Yup.string().required('Este campo é obrigátorio'),
});

export default userCreateSchema;
