import Swal from "sweetalert2";

export async function confirmDelete(
    title = "Delete Record",
    text = "This action cannot be undone."
) {

    const result = await Swal.fire({

        title,

        text,

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#7B1FA2",

        cancelButtonColor: "#d33",

        confirmButtonText: "Yes, Delete",

        cancelButtonText: "Cancel",

        reverseButtons: true,

        focusCancel: true

    });

    return result.isConfirmed;

}

export async function confirmAction(

    title,

    text,

    icon = "question"

) {

    const result = await Swal.fire({

        title,

        text,

        icon,

        showCancelButton: true,

        confirmButtonColor: "#7B1FA2",

        cancelButtonColor: "#6c757d",

        confirmButtonText: "Continue",

        cancelButtonText: "Cancel"

    });

    return result.isConfirmed;

}
