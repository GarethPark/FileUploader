import { LightningElement, api, track} from 'lwc';

export default class Fileuploader extends LightningElement {
    @api recordId;
    @track isOpenModal = false;

    contacts = [
        {
            Id: '003171931112854375',
            Name: 'Amy Taylor',
            Title: 'VP of Engineering'
        },
        {
            Id: '003192301009134555',
            Name: 'Michael Jones',
            Title: 'VP of Sales'
        },
        {
            Id: '003848991274589432',
            Name: 'Jennifer Wu',
            Title: 'CEO'
        }
    ];

    get acceptedFormats() {
        return ['.pdf', '.png'];
    }

    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        alert("No. of files uploaded : " + uploadedFiles.length);
    }

    handleOpenModal() {
        this.isOpenModal = true;
    }
   
    handleCloseModal() {
        this.isOpenModal = false;
    }
}