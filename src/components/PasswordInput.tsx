import { yupResolver } from "@hookform/resolvers/yup";
import { IonButton, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonModal, IonToolbar } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { ComponentProps, useState } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { object, string } from "yup";

type IonInputProps = ComponentProps<typeof IonInput>;

interface IPasswordInputProps extends IonInputProps {
  inputValue?: string;
  onInputChange?: (value: string) => void;
  showTogglePass?: boolean;
}

interface IPasswordInputForm {
  pass: string;
  confirmPass: string;
}

const VSPasswordInputField = object().shape({
  pass: string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
  confirmPass: string()
    .required('Please confirm your password')
    .test(
      'match',
      'Passwords do not match',
      function () {
        return this.parent.pass === this.parent.confirmPass
      }
    )
});

function PasswordInput(props: IPasswordInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { control, handleSubmit, watch, formState: { errors } } = useForm<IPasswordInputForm>({
    resolver: yupResolver(VSPasswordInputField),
    defaultValues: {
      'pass': props.inputValue
    }
  });

  const handleTap = () => setIsOpen(true);

  const handleDismiss = () => setIsOpen(false);

  const handleConfirm = (data: IPasswordInputForm) => {
    handleDismiss();
    if (props.onInputChange) props.onInputChange(data.pass);
  }

  const handleError = (errors: FieldErrors<IPasswordInputForm>) => {
    console.log("error: ", errors)
  }

  const toggleShowPass = (value: boolean) => {
    console.log(`[PasswordInput]: Toggled show password: ${value}`)
    setShowPass(value)
  } 

  return (
    <>
      <IonInput
        onClick={handleTap}
        value={props.value ?? watch('confirmPass')}
        readonly
        type={showPass ? 'text' : 'password'}
        {...props}
      />
      {props.showTogglePass &&
        <div className="flex justify-end mt-2">
          <IonCheckbox labelPlacement="end" value={showPass} onIonChange={(e) => toggleShowPass(e.target.checked)}>
            Show Password
          </IonCheckbox>
        </div>}
      <IonModal isOpen={isOpen} onDidDismiss={handleDismiss} initialBreakpoint={0.4} breakpoints={[0, 0.4]}>
        <IonHeader>
          <IonToolbar>
            <IonButton color="medium" fill="clear" slot="start" onClick={handleDismiss}>
              <IonIcon src={closeOutline} />
            </IonButton>
            <IonButton slot="end" fill="clear" onClick={handleSubmit(handleConfirm, handleError)} strong>
              Confirm
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div className="flex flex-col gap-y-5">
            <Controller
              name="pass"
              control={control}
              render={({ field: { value, onChange, onBlur }, fieldState: { isTouched } }) => (
                <IonInput
                  tabIndex={0}
                  className={`${errors.pass && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                  fill="outline"
                  type="password"
                  labelPlacement="floating"
                  label="Password"
                  errorText={errors.pass?.message}
                  value={value}
                  onIonChange={e => onChange(e)}
                  onIonBlur={() => onBlur()}
                />
              )}
            />
            <Controller
              name="confirmPass"
              control={control}
              render={({ field: { value, onChange, onBlur }, fieldState: { isTouched } }) => (
                <IonInput
                  tabIndex={1}
                  className={`${errors.confirmPass && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                  fill="outline"
                  type="password"
                  labelPlacement="floating"
                  label="Repeat Password"
                  errorText={errors.confirmPass?.message}
                  value={value}
                  onIonChange={e => onChange(e)}
                  onIonBlur={() => onBlur()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSubmit(handleConfirm, handleError)
                  }}
                />
              )}
            />
          </div>
        </IonContent>
      </IonModal>
    </>
  )
}

export default PasswordInput;