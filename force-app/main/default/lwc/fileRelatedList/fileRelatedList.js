import { LightningElement, api, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import uploadFiles from '@salesforce/apex/FileUploadService.uploadFiles';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Fileuploader extends NavigationMixin(LightningElement) {
    @api recordId;
    @track isOpenModal = false;
    @track uploadDisabledd =false;
    @track fileName = '';
    @track fileUploaded;
    @track contentVersionId;
    //check all tracks needed?

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
    //TO DO : Expand * Check ContentVerion trigger in DBCore
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
            
            let file = event.target.files[event.target.files.length -1];
            let reader = new FileReader();
            reader.onload = e => {
                let base64 = 'base64,';
                let content = reader.result.indexOf(base64) + base64.length;
                let fileContents = reader.result.substring(content);
                this.fileUploaded = {PathOnClient: file.name, Title: file.name, VersionData: fileContents};
                this.fileName = file.name;
            };
            reader.readAsDataURL(file); 
        }
    }
    /*attachFiles(event){
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
    }*/
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
    handleSubmit(event)
    {
        event.preventDefault();      
        const fields = event.detail.fields;
        fields.PathOnClient = this.fileUploaded.PathOnClient;
        fields.VersionData =  this.fileUploaded.VersionData;
        fields.Title = this.fileUploaded.Title;
        fields.IsMajorVersion = false;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
     }
    handleSuccess(event) 
    {
        this.contentVersionId = event.detail.id;
        this.showToastMessage('Success','Files uploaded', 'success');
        console.log('onsuccess: ', this.contentVersionId);
    }
}