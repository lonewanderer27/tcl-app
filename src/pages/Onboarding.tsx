import {
  FieldValue,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { getAuth, updateProfile } from "firebase/auth";
import { memo, useState } from "react";

import { FirebaseError } from "firebase/app";
import ProfileImage from "../components/ProfileImage";
import { UserConvert } from "../converters/user";
import { isPlatform } from "@ionic/react";
import { useDocument } from "react-firebase-hooks/firestore";
import { Gender, Pronouns } from "@/enums";

interface IFormInput {
  nickname: string;
  gender?: Gender;
  pronouns?: Pronouns;
  updatedAt?: FieldValue;
}

function Onboarding() {
  const db = getFirestore();
  const auth = getAuth();
  const router = useIonRouter();

  const userRef = doc(
    db,
    "users",
    auth.currentUser?.uid ?? "Loading"
  ).withConverter(UserConvert);
  const [values] = useDocument(userRef);
  let userData: any;

  console.info(values);

  const {
    handleSubmit,
    getValues,
    watch,
    control,
    formState: { isValid, isValidating },
  } = useForm<IFormInput>({
    defaultValues: async () => {
      userData = await getDoc(userRef);
      return {
        nickname: userData.get("nickname") ?? "",
        gender: userData.get("gender") ?? "",
        pronouns: userData.get("pronouns") ?? "",
      };
    },
  });
  const [loading, setLoading] = useState(false);
  const [presentAlert] = useIonAlert();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);

    try {
      // update firebase user profile
      await updateProfile(auth.currentUser!, {
        displayName: data.nickname,
      });

      // construct the user data
      const formData: IFormInput = {
        nickname: data.nickname,
        updatedAt: serverTimestamp(),
        ...(data.gender && { gender: data.gender }),
        ...(data.pronouns && { pronouns: data.pronouns }),
      };

      // set the information in user's document
      await setDoc(userRef, {
        ...userData,
        ...formData,
        onboarded: true,
      });

      // navigate to home
      setLoading(false);
      router.push("/home", "forward", "replace");
    } catch (err: unknown) {
      const error = err as FirebaseError;
      console.error(err);
      presentAlert({
        header: "Error",
        message: error.message,
        buttons: ["OK"],
      });
    }
  };

  const currentUser = auth.currentUser;
  console.log("values: ", getValues());

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="p-4 pt-0">
          <ProfileImage
            currentUser={currentUser}
            gender={watch("gender")}
            imgClassName="my-5 w-2/4 ml-[-20px] rounded-full"
            onboarding
            showEditBtn
          />
          <h6 className="font-bold">Before you start</h6>
          <p>
            To personalize your orders, we would like to ask you a few things.
          </p>
          <form
            className="flex flex-col justify-center items-center mt-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="nickname"
              control={control}
              render={({ field }) => (
                <IonInput
                  label="Nickname"
                  labelPlacement="start"
                  fill="outline"
                  placeholder="What should we call you?"
                  onIonChange={e => field.onChange(e)}
                  onIonBlur={() => field.onBlur()}
                  value={watch("nickname")}
                  className="ion-text-end"
                />
              )}
            />
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <IonSelect
                  {...field}
                  interface="action-sheet"
                  label="Gender"
                  labelPlacement="fixed"
                  placeholder="Select (Optional)"
                  fill="outline"
                  className="mt-3"
                  onIonChange={e => field.onChange(e)}
                  onIonBlur={() => field.onBlur()}
                  value={watch("gender")}
                >
                  <IonSelectOption value={Gender.Male}>{Gender.Male}</IonSelectOption>
                  <IonSelectOption value={Gender.Female}>{Gender.Female}</IonSelectOption>
                  <IonSelectOption value={Gender.NonBinary}>{Gender.NonBinary}</IonSelectOption>
                  <IonSelectOption value={Gender.IdRatherNotSay}>{Gender.IdRatherNotSay}</IonSelectOption>
                </IonSelect>
              )}
            />
            <Controller
              name="pronouns"
              control={control}
              render={({ field }) => (
                <IonSelect
                  {...field}
                  interface="action-sheet"
                  label="Pronouns"
                  labelPlacement="fixed"
                  placeholder="Select (Optional)"
                  fill="outline"
                  className="mt-3"
                  onIonChange={e => field.onChange(e)}
                  onIonBlur={() => field.onBlur()}
                  value={watch("pronouns")}
                >
                  <IonSelectOption value={Pronouns.HeHim}>{Pronouns.HeHim}</IonSelectOption>
                  <IonSelectOption value={Pronouns.SheHer}>{Pronouns.SheHer}</IonSelectOption>
                  <IonSelectOption value={Pronouns.TheyThem}>{Pronouns.TheyThem}</IonSelectOption>
                  <IonSelectOption value={Pronouns.IdRatherNotSay}>{Pronouns.IdRatherNotSay}</IonSelectOption>
                </IonSelect>
              )}
            />
            <IonButton
              className="ion-margin-top w-full mt-8"
              type="submit"
              disabled={!isValid || isValidating}
            >
              {loading ? (
                <IonSpinner
                  className={`${!isPlatform("ios") && "animate-spin"}`}
                />
              ) : (
                "Continue"
              )}
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage >
  );
}

export default memo(Onboarding);
