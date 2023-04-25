    pragma solidity >=0.4.21 <=0.8.18;
    
    contract Notepad{
        uint256 NOTE_CNT ;
        constructor() public{
            NOTE_CNT =0 ;
        }


        struct Note{
            string fileid;
            string filename;
            string ipfsCid;
            uint256 timestamp;
            bool isdeleted;
        }
        mapping(address => Note[]) public notes;


        event NoteUpdated(address user, string fileid, string ipfsCid, uint256 timestamp);

        function updateNote(string memory fileid, string memory newIpfsCid, string memory newfilename) public {
            require(noteExists(msg.sender, fileid), "Note with that filename does not exist");
            
            // Loop through the notes to find the note with the matching filename
            for (uint i = 0; i < notes[msg.sender].length; i++) {
                if (keccak256(abi.encodePacked(notes[msg.sender][i].fileid)) == keccak256(abi.encodePacked(fileid))) {
                    // Update the IPFS CID of the note
                    notes[msg.sender][i].filename = newfilename;                    
                    notes[msg.sender][i].ipfsCid = newIpfsCid;
                    notes[msg.sender][i].timestamp = block.timestamp;

                    emit NoteUpdated(msg.sender, fileid, newIpfsCid, block.timestamp);
                    break;
                }
            }
        }


        function noteExists(address user, string memory fileid) public view returns (bool) {
                for (uint i = 0; i < notes[user].length; i++) {
                    if (keccak256(abi.encodePacked(notes[user][i].fileid)) == keccak256(abi.encodePacked(fileid))) {
                        return true;
                    }
                }
                return false;
        }

        event noteDeleted(address user, string fileid, uint256 timestamp);
        function deleteNote(string memory fileid) public returns (string memory) {
                  require(noteExists(msg.sender, fileid), "Note with that filename does not exist");
                  for (uint i = 0; i < notes[msg.sender].length; i++) {
                        if (keccak256(abi.encodePacked(notes[msg.sender][i].fileid)) == keccak256(abi.encodePacked(fileid))) {
                            // Update the IPFS CID of the note
                            string memory ipfsCid = notes[msg.sender][i].ipfsCid;
                            notes[msg.sender][i].isdeleted=true;
                            emit noteDeleted(msg.sender, fileid, block.timestamp);
                            return ipfsCid;
                }
            }
                return "";                
        }


        event NoteAdded(address user,string filename, string content, uint256 timestamp);
        function addNote(string memory fileid,string memory filename,string memory ipfsCid) public {
            
            require(!noteExists(msg.sender, fileid), "Note with that filename already exists");
            
            Note memory newNote = Note(fileid,filename,ipfsCid, block.timestamp,false);
            notes[msg.sender].push(newNote);
            emit NoteAdded(msg.sender, filename,ipfsCid, block.timestamp);
        }
    
        function getNoteCount() public view returns (uint256) {
            return notes[msg.sender].length;
        }

          
        function getNoteByIndex(uint256 index) public view returns (string memory,string memory, uint256,bool) {
            require(index < notes[msg.sender].length, "Index out of range");
            require(index < notes[msg.sender].length, "Index out of range");
            return (notes[msg.sender][index].filename, notes[msg.sender][index].ipfsCid, notes[msg.sender][index].timestamp,notes[msg.sender][index].isdeleted);
        }




    }