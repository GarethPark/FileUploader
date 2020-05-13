import { LightningElement, api, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Fileuploader extends NavigationMixin(LightningElement) {
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
    //AttachedContentDocuments //OpportunityContactRoles
    navigateToContactRoleRelatedList() {
        // Navigate to the CaseComments related list page
        // for a specific Case record.
        this[NavigationMixin.Navigate]({
            type: 'standard__recordRelationshipPage',
            attributes: {
                recordId: '0068E00000P7mEfQAJ',
                objectApiName: 'Opportunity',
                relationshipApiName: 'OpportunityContactRoles',
                actionName: 'view'
            }
        });
    }
    navigateToFileRelatedList() {
        // Navigate to the CaseComments related list page
        // for a specific Case record.
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
}