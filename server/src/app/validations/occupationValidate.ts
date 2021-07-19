import * as Yup from 'yup';

const occupationSchema = Yup.object().shape({
  id: Yup.string(),
  description: Yup.string().required("O campo 'Descrição' é obrigátorio"),
  situation: Yup.boolean().required("O campo 'Situação' é obrigátorio"),
});

export default occupationSchema;
