import { SweetAlertCustomClass, SweetAlertOptions } from 'sweetalert2';
import { Colors } from 'src/app/helpers';

class SwalAlerts {

    swalErrorLocation = (
        title: string = 'Location error',
        text: string = "Couldn't get your location, check your connection or let the app know your location",
    ): SweetAlertOptions => ({
        html: `
        <div>
            <div class="iconSwal"><i class="fas fa-map-marker-alt iconBorder"></i></div><hr>
            <h4 class='text-center'>${title}</h4>
            <p style='font-size: 15px;' class='mt-4'>${text}</p>
        </div>`,
        showCancelButton: false,
        showConfirmButton: false
    })

    swalAuthAction = (
        title: string = 'Confirm this action?',
        confirmButtonText: string = 'Yes',
        cancelButtonText: string = 'No'
    ): SweetAlertOptions => ({
        title,
        showConfirmButton: true,
        confirmButtonText,
        showCancelButton: true,
        cancelButtonText,
        icon: "question",
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        }
    });

    swalSuccess = (
        title: string = 'Action succesfully completed',
        text: string = 'The action has succesfully been completed',
        buttonText: string = 'Understood'
    ): SweetAlertOptions => ({
        title,
        text,
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: buttonText,
        customClass: {
            confirmButton: 'btn btn-success'
        },
        timer: 3000
    });

    swalError = (
        title: string = 'Error',
        text: string = 'Unknown error',
        buttonText: string = 'Understood'
    ): SweetAlertOptions => ({
        title,
        text,
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: buttonText,
        customClass: {
            confirmButton: 'btn btn-danger'
        },
        timer: 3000
    });

    swalInfo = (
        text: string,
        buttonText: string = 'Understood'
    ): SweetAlertOptions => ({
        text,
        icon: "info",
        showConfirmButton: true,
        confirmButtonText: buttonText,
        customClass: {
            confirmButton: 'btn btn-info'
        },
        timer: 3000
    });

    swalRegisterUser = (
        title: string = 'Sign up successfully!',
        text: string = 'Email sent to your email address',
    ): SweetAlertOptions => ({
        html: `
        <div>
            <div class="iconSwal"><i class="fa-solid fa-user iconBorder success"></i></div><hr>
            <h4 class='text-center'>${title}</h4>
            <p style='font-size: 15px;' class='mt-4'>${text}</p>
        </div>`,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Understood',
        customClass: {
            confirmButton: 'btn btn-success'
        },
        timer: 3000
    });

    swalCustom = (
        html: string,
        custom?: SweetAlertOptions
    ): SweetAlertOptions => ({
        html,
        ...custom,
    });
}
export default new SwalAlerts();