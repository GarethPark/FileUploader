import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Fileuploader extends NavigationMixin(LightningElement) {
    @api myRecordId;

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
    navigateToProductRelatedList() {
        // Navigate to the CaseComments related list page
        // for a specific Case record.
        this[NavigationMixin.Navigate]({
            type: 'standard__recordRelationshipPage',
            attributes: {
                recordId: '500xx000000Ykt4AAC',
                objectApiName: 'Case',
                relationshipApiName: 'CaseComments',
                actionName: 'view'
            }
        });
    }
}