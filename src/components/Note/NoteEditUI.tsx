import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

const schema = yup.object({
  id: yup.string(),
  title: yup.string().required().min(3),
  body: yup.string().required().min(3),
});

export type FormData = yup.InferType<typeof schema>;
export type FormProps = {
    data?: FormData | null;
    onSubmit: (values: FormData) => unknown;
    disabled?: boolean;
    genericMessage?: ReactNode;
}

const empty = { title: '', body: '' }

export default function NoteEditUI(props: FormProps) {
  const { data } = props;
  const { register, handleSubmit, formState: { errors } } = 
    useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: { ...data ?? empty }
    });

  // if (!data)
  //   return null;
  
  return (
    <Box component="form" onSubmit={handleSubmit(props.onSubmit)} noValidate sx={{ mt: 1, width: 380 }}>
      <Typography>{data?.id ? 'Edit ' : 'Create '}Note</Typography>
      {
        props.genericMessage
      }
      <input type="hidden" {...register(`id`)} defaultValue={data?.id} />
      <TextField
        margin="normal"
        fullWidth
        id="title"
        label="Number"
        autoComplete="title"
        {...register("title")}
        error={!!errors.title}
        helperText={
          errors.title 
            ? <span data-test='title-error'>{errors.title.message}</span>
            : " "
        }
        inputProps={{
          "data-test": "title"
        }}                
      />
      <TextField
        margin="normal"
        fullWidth
        id="body"
        label="Number"
        autoComplete="body"
        {...register("body")}
        error={!!errors.body}
        helperText={
          errors.body 
            ? <span data-test='body-error'>{errors.body.message}</span>
            : " "
        }
        inputProps={{
          "data-test": "body"
        }}                
      />
      <LoadingButton
        loading={ props.disabled }
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        data-test="submit-note"
      >
            Submit
      </LoadingButton>
    </Box>
  );
};