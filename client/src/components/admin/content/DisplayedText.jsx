import React from 'react'
import { useState, useEffect } from "react";
// 📝 Draft.js EditorState :
import { EditorState, convertFromRaw } from 'draft-js';

// 📋 React-Draft-Wysiwyg Text Editor and Styles :
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function DisplayedText({ content }) {

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    // Send content to EditorState :
    useEffect(() => {
        content && setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(content))));
    }, [content]);

    return (
        <>
            <Editor
                editorState={editorState}
                readOnly={true}
                toolbarStyle={{ display: 'none' }}
            />
        </>
    )

}

export default DisplayedText