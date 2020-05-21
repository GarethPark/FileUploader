import { LightningElement, api, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import uploadFiles from '@salesforce/apex/FileUploadService.uploadFiles';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Fileuploader extends NavigationMixin(LightningElement) {
    @api recordId;
    @track isOpenModal = false;
    @track filesUploaded = [];
    @track uploadDisabledd =false;

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
    //TO DO : Expand
    get acceptedFormats() {
        return ['.pdf', '.png'];
    }

    handleOpenModal() {
        this.isOpenModal = true;
    }
   
    handleCloseModal() {
        this.isOpenModal = false;
    }
    //TODO : Remove hardcoded ID
    navigateToFileRelatedList() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordRelationshipPage',
            attributes: {
                recordId: '0068E00000P7mEfQAJ',
                objectApiName: 'Opportunity',
                relationshipApiName: 'AttachedContentDocuments',
                actionName: 'view'
            }
        });
    }
    handleFileUploaded(event) {
        if (event.target.files.length > 0) {
            let files = [];
            for(var i=0; i< event.target.files.length; i++){
                let file = event.target.files[i];
                let reader = new FileReader();
                reader.onload = e => {
                    let base64 = 'base64,';
                    let content = reader.result.indexOf(base64) + base64.length;
                    let fileContents = reader.result.substring(content);
                    this.filesUploaded.push({PathOnClient: file.name, Title: file.name, VersionData: fileContents});
                };
                reader.readAsDataURL(file);
            }
        }
    }
    attachFiles(event){
        uploadFiles({files: this.filesUploaded})
            .then(result => {
                if(result == true) {
                    this.showToastMessage('Success','Files uploaded', 'success');
                }else{
                    this.showToastMessage('Error','Error uploading files', 'error');
                }
            })
            .catch(error => {
                this.showToastMessage('Error','Error uploading files', 'error');
            });
    }
    showToastMessage(title,message,variant){
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }
    connectedCallback() 
    {
        this.disabledCondition = true;
    } 
    handleSubmit(event){
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        fields.PathOnClient = this.filesUploaded[0].PathOnClient;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
     }
}