import * as FileSystem from 'expo-file-system';
const TEMP_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJmWXpwTXNteDF5QlB2NTNuWl9ld1lvUlZoaEZYT1Zid0tJRDFkMWxkWHBJIn0.eyJleHAiOjE3NDExMDMwMzMsImlhdCI6MTc0MDY3MTAzMiwianRpIjoiYmVlNWMyOGUtZGEwMy00ZGYzLWJiZTUtYzZiY2ZkNjQ4NmVlIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDg3L3JlYWxtcy9zZXJyZXVzX2RldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5NWIzMzVlYy1mNTZmLTQ1NzQtOTkzMi1kZGI0NzUwZDEzZjMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzZXJyZXVzX3VzZXJzIiwic2lkIjoiZGVhMGE4YmMtN2U2ZC00OGFjLTg5ZjMtOGRjYTRkYmQyODY1IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtc2VycmV1c19kZXYiXX0sInJlc291cmNlX2FjY2VzcyI6eyJzZXJyZXVzX3VzZXJzIjp7InJvbGVzIjpbInNlcl9jbGllbnRfcm9sZSJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBub21fdGVuX2lkIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IktlaXRoIExvb3NlIiwicHJlZmVycmVkX3VzZXJuYW1lIjoia2xvb3NlQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJLZWl0aCIsImZhbWlseV9uYW1lIjoiTG9vc2UiLCJlbWFpbCI6Imtsb29zZUBnbWFpbC5jb20iLCJub21fdGVuX2lkIjoiZGJjODIxNTQtNjM4YS00NDA2LTk4MDMtZjRmZWYzYjdkNGEwIn0.ntnJBKEKewHtO9CZPCph2tlvBZygPfuL3h17yKi8HtUtqwttHVstTPUMbQdkgd7FbhAUqZaEj6bwKAOKZgByij_A7O9Z0_PELy55g44R64s93CH0kcIwqHamiN-nhcGYTMlzsqYHzG3ElvHnfZzb3yR9BT5yPcDMwTbhPLhe0kX1FfoCO5NAkhZtpDiwp1-H-1r-b4GS-3j6WPqOBk-e7sdVBUX-Cil5Mz2flx4JNxzve2N3qSdyk3pMDQpG-7vs3UI-02Z-976ak1bvcri67x4TlRpYcErTbrfs96jzs1QcOmDox3MU7M5f6XpNJDqdPUqXIh2uiPUGz9u4CYaQZA"

 //Check if the Document Directory was created
 export const uploadToEvermix = async (uploadServer: string, recordingId: string, fileUri: string) => {
          try {
            const response = await FileSystem.uploadAsync(`${uploadServer}/${recordingId}/upload`, fileUri, {
              fieldName: 'file',
              httpMethod: 'PATCH',
              headers: {
                "Content-Type": "multipart/form-data", 
                "Authorization": `Bearer ${TEMP_TOKEN}`
              },
              uploadType: FileSystem.FileSystemUploadType.MULTIPART,
              sessionType: FileSystem.FileSystemSessionType.BACKGROUND
            });
            console.log(JSON.stringify(response, null, 4));
          } catch (error) {
            console.log(error);
          }
}