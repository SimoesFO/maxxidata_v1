import * as Yup from 'yup';

const employeeSchema = Yup.object().shape({
  id: Yup.string(),
  name: Yup.string().required("O campo 'Nome' é obrigátorio"),
  phone: Yup.string()
    .matches(/^\d+$/, 'O telefone só pode conter números')
    .min(8, 'O telefone informado não é válido.')
    .required("O campo 'Telefone' é obrigátorio"),
  email: Yup.string()
    .email('O e-mail informado não é válido.')
    .required("O campo 'E-mail' é obrigátorio"),
  occupationId: Yup.string()
    .uuid('A profissão informada não é válida.')
    .required("O campo 'Profissão' é obrigátorio"),
  situation: Yup.boolean().required("O campo 'Situação' é obrigátorio"),
});

export default employeeSchema;
