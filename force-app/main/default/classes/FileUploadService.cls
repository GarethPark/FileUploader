public with sharing class FileUploadService {
    public class relatedFile {
        public String PathOnClient;
        public String Title;
        public Blob VersionData;
    }

    @AuraEnabled
    public static boolean uploadFiles(List<Map<String, Object>> files){
        System.debug('In uploadFiles');
        Boolean isSuccess = false;
        List<ContentVersion> relatedDocuments = new List<ContentVersion>();
        for (Map<String, Object> file : files) {
            String fileJson = JSON.serialize(file);
            System.debug('json of file = ' +fileJson);
            relatedFile relatedDocument = (relatedFile) JSON.deserialize(fileJson, relatedFile.class);
            ContentVersion contentVersionFile = new ContentVersion();
            contentVersionFile.PathOnClient = relatedDocument.PathOnClient;
            contentVersionFile.Title = relatedDocument.Title;
            contentVersionFile.VersionData = relatedDocument.VersionData;
            relatedDocuments.add(contentVersionFile);
        }
        Database.saveResult[] srFiles = Database.insert(relatedDocuments);
        for (Database.SaveResult saveResult : srFiles) {
            isSuccess = saveResult.isSuccess();
        }
        return isSuccess;
    }

    @AuraEnabled
    public static boolean uploadFile(Map<String, Object> file){
        System.debug('In uploadFiles');
        Boolean isSuccess = false;
        
        String fileJson = JSON.serialize(file);
        System.debug('json of file = ' +fileJson);
        relatedFile relatedDocument = (relatedFile) JSON.deserialize(fileJson, relatedFile.class);
        ContentVersion contentVersionFile = new ContentVersion();
        contentVersionFile.PathOnClient = relatedDocument.PathOnClient;
        contentVersionFile.Title = relatedDocument.Title;
        contentVersionFile.VersionData = relatedDocument.VersionData;
        
        Database.saveResult srFiles = Database.insert(contentVersionFile);
        isSuccess = Database.saveResult.isSuccess();
        
        return isSuccess;
    }
}
