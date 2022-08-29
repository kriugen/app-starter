import { ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box, Button, TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

const schema = yup.object({
  id: yup.string(),
  title: yup.string().required().min(3),
  body: yup.string().required().min(3),
});

export type FormData = yup.InferType<typeof schema>;
export type FormProps = {
    note?: FormData | null;
    onSubmit: (values: FormData) => unknown;
    onChange: (isDirty: boolean) => unknown;
    onDelete: (note: FormData) => unknown;
    disabled?: boolean;
    genericMessage?: ReactNode;
}

const empty = { title: '', body: '' }

export default function NoteEditUI(props: FormProps) {
  const { note } = props;
  const { register, reset, watch, handleSubmit, formState } = 
    useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: { ...note ?? empty }
    });

  const errors = formState.errors;
  useEffect(() => {
      reset(note ?? empty);
  }, [note]);
  
  useEffect(() => {
     props.onChange(formState.isDirty);
  }, [props, formState])

  const title = watch('title');
  const body = watch('body');

  return (
    <Box component="form" onSubmit={handleSubmit(props.onSubmit)} noValidate 
      sx={{ m: 1 }}>
      {
        props.genericMessage
      }
      <input type="hidden" {...register(`id`)} defaultValue={note?.id} />
      <Button disabled={!note} sx={{float: "right" }} onClick={() => props.onDelete(note)}>Delete</Button>
      <TextField
        InputLabelProps={{shrink: false}}
        margin="normal"
        fullWidth
        id="title"
        label={title ? '' : "Title" }
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
        InputLabelProps={{shrink: false}}
        margin="normal"
        fullWidth
        multiline
        rows={20}
        id="body"
        label={body ? '' : "Body"}
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
      { formState.isDirty &&
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
      }
    </Box>
  );
};