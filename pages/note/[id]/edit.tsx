import { ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Controller } from "react-hook-form";
import Autocomplete from '@mui/material/Autocomplete';
import { ClientName } from '../api/invoices';
import { emptyInvoice } from '../store/invoiceSlice';

import { InvoiceItems } from "./InvoiceItems";

const schema = yup.object({
  id: yup.string(),
  date: yup.number().required(),
  dueDate: yup.number().required().min(yup.ref('date'), 'Due date should be after invoice date'),
  invoice_number: yup.string().required().min(3),
  projectCode: yup.string().matches(/.{3,}/, {
    excludeEmptyString: true,
    message: 'Project Code must be 3 characters or empty',
  }),
  client_id: yup.string().required(),
  items: yup.array().of(
    yup.object({
      description: yup.string().required("item description is required"),
      value: yup.number().required().min(1)
        .typeError('must be a number')
        .positive('must be greater than 0')
    })
  )
});

export type InvoiceFormData = yup.InferType<typeof schema>;
export type FormProps = {
    data?: InvoiceFormData | null;
    clients: Array<ClientName> | null;
    disabled?: boolean;
    genericMessage?: ReactNode;
    onSubmit: (values: InvoiceFormData) => unknown;
}

export const InvoiceForm = (props: FormProps) => {
  const { data, disabled } = props;
  const { control, reset, register, handleSubmit, formState: { errors } } = 
    useForm<InvoiceFormData>({
      resolver: yupResolver(schema),
      defaultValues: { ...data ?? emptyInvoice }
    });

  useEffect(() => {
    reset(data ?? emptyInvoice);
  }, [reset, data]);

  const selectClient = (value: string) => {
    if (!props.clients || props.clients.length == 0) {
      throw new Error('clients not initialized form invoice dropdown');
    }

    if (!value)
      return props.clients[0];

    const val = props.clients.find(c => c.id == value);
    if (!val) {
      throw new Error('client not found for invoice dropdown, id ' + value);
    }

    return val;
  };

  if (!data)
    return null;
  
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box component="form" onSubmit={handleSubmit(props.onSubmit)} noValidate sx={{ mt: 1, width: 380 }}>
        <Typography>{data?.invoice_number ? 'Edit ' : 'Create '}Invoice</Typography>
        {
          props.genericMessage
        }
        <input type="hidden" {...register(`id`)} defaultValue={data?.id} />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="date"
            control={control}
            render={({
              field: { onChange, value },
            }) => (
              <DatePicker
                label="Date"
                value={value}
                onChange={(value: Date | null) => {
                  onChange(value?.getTime());
                }}
                renderInput={(params) => (
                  <TextField
                    helperText={
                      errors.date 
                        ? <span data-test='invoice-date-error'>{errors.date.message}</span>
                        : " "
                    }
                    id="date"
                    variant="standard"
                    margin="dense"
                    fullWidth
                    color="primary"
                    autoComplete="bday"
                    {...params}
                    error={!!errors.date}
                    inputProps={{
                      ...params.inputProps,
                      "data-test": "invoice-date"
                    }} 
                  />
                )}
              />
            )}
          />
          <Controller
            name="dueDate"
            control={control}
            render={({
              field: { onChange, value }
            }) => (
              <DatePicker
                label="Due Date"
                value={value}
                onChange={(value: Date | null) => {
                  onChange(value?.getTime());
                }}
                renderInput={(params) => (
                  <TextField
                    helperText={
                      errors.dueDate 
                        ? <span data-test='invoice-due-date-error'>{errors.dueDate.message}</span>
                        : " "
                    }
                    id="dueDate"
                    variant="standard"
                    margin="dense"
                    fullWidth
                    color="primary"
                    autoComplete="bday"
                    {...params}
                    error={!!errors.dueDate}
                    inputProps={{
                      ...params.inputProps,
                      "data-test": "invoice-due-date"
                    }} 
                  />
                )}
              />
            )}
          />
        </LocalizationProvider>
        <TextField
          disabled={disabled}
          margin="normal"
          fullWidth
          id="invoice_number"
          label="Number"
          autoComplete="invoice_number"
          {...register("invoice_number")}
          error={!!errors.invoice_number}
          helperText={
            errors.invoice_number 
              ? <span data-test='invoice-number-error'>{errors.invoice_number.message}</span>
              : " "
          }
          inputProps={{
            "data-test": "invoice-number"
          }}                
        />
        <TextField
          disabled={disabled}
          margin="normal"
          fullWidth
          id="projectCode"
          label="Project Code"
          autoComplete="projectCode"
          {...register("projectCode")}
          error={!!errors.projectCode}
          helperText={
            errors.projectCode
              ? <span data-test='invoice-project-code-error'>{errors.projectCode.message}</span>
              : " "
          }
          inputProps={{
            "data-test": "invoice-project-code"
          }}                
        />
        <Controller
          name="client_id"
          control={control}
          render= {({
            field: { onChange, value },
          }) => (
            <Autocomplete
              disablePortal
              onChange={(e, data) => {
                onChange(data?.id);
              }}
              getOptionLabel={(client) => client.companyName}
              id="client_id"
              options={props.clients ?? []}
              renderInput={(params) => 
                <TextField 
                  {...params} 
                  label="Client" 
                  inputProps={{
                    ...params.inputProps,
                    "data-test": "invoice-company-id"
                  }}
                />}
              value={selectClient(value)}
            />
          )}
        />
        <InvoiceItems control={control} errors={errors} register={register} />
        <LoadingButton
          loading={disabled}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          data-test="submit-invoice"
        >
              Submit
        </LoadingButton>
      </Box>
    </Box>
  );
};
