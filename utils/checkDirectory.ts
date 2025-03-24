
import * as FileSystem from 'expo-file-system';

 //Check if the Document Directory was created
 export const checkDirectory = (directoryName: string) => {
    const makeDir = async () => {
      const dir = await FileSystem.getInfoAsync(directoryName);
      if (!dir.exists) {
        console.log("Recordings Folder directory doesn't exist, creating....");
        await FileSystem.makeDirectoryAsync(directoryName, {
          intermediates: true,
        });
      }
      const dirInfo = await FileSystem.readDirectoryAsync(directoryName);
      console.log("URI of Recording Folder.:");
      console.log(dir);
      console.log("Contents of Recording Folder:");
      console.log(dirInfo);
    };

    makeDir();

}