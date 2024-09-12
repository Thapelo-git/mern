import { RequestHandler } from "express";
import NoteModel from '../models/note'
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";


export const getNotes:RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    try{
        assertIsDefined(authenticatedUserId)
    
      const notes = await NoteModel.find({userId:authenticatedUserId}).exec();
      res.status(200).json(notes)
    }catch(error){
     next(error)
    }
  };

  export const getNote:RequestHandler =async(req,res,next)=>{
    const noteId = req.params.noteId;
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId)
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400,"Invalid note id");
        }
        const note =await NoteModel.findById(noteId).exec();
        if(!note){
            throw createHttpError(404,"Note not found")
        }
        res.status(200).json(note)
        if(!note.userId.equals(authenticatedUserId)){
            throw createHttpError(401,"You cannot Access this note")
        }
        
    } catch (error) {
        next(error)
        
    }
  }

  interface CreateNoteBody{
    title?:string,
    text?:string,

  }
  export const createNotes:RequestHandler<unknown,unknown,CreateNoteBody,unknown> = async (req,res,next)=>{
    const title = req.body.title;
    const text  = req.body.text;
    const authenticatedUserId = req.session.userId;
    try{
        assertIsDefined(authenticatedUserId)
        if(!title){
            throw createHttpError(400,"Note must have a tile")
        }
        const newNote = await NoteModel.create({
            userId:authenticatedUserId,
            title:title,
            text:text,
        });
        res.status(201).json(newNote);
    }catch(error){
        next(error)
    }
  }

  interface UpdateNoteParams{
    noteId:string,
  }
  interface UpdateNoteBody{
    title?:string,
    text?:string,
  }
  export const updateNotes:RequestHandler<UpdateNoteParams,unknown,UpdateNoteBody,unknown> =async(req,res,next)=>{
    const noteId = req.params.noteId;
    const newTitle =req.body.title;
    const newText =req.body.text;
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId)
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400,"Invalid note id");
        }
       
        if(!newTitle){
            throw createHttpError(404,"Note must have a title")
        }
        const note =await NoteModel.findById(noteId).exec();

        if(!note){
            throw createHttpError(404,"Note not found")
        }
        if(!note.userId.equals(authenticatedUserId)){
            throw createHttpError(401,"You cannot access this note")
        }

        note.title = newTitle;
        note.text = newText;

        const updateNote =await note.save();
        // const updateNote = await NoteModel.findByIdAndUpdate(noteId);
        res.status(200).json(updateNote);
     
    } catch (error) {
        next(error)
    }
  }
   export const deleteNote:RequestHandler =async(req,res,next)=>{
    const noteId =req.params.noteId;
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId)
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400,"Invalid note id")
        }
        const note = await NoteModel.findById(noteId).exec();
        if(!note){
            throw createHttpError(404,"Note not found")
        }
        if(!note.userId.equals(authenticatedUserId)){
            throw createHttpError(401,"You cannot access this note")
        }
        // await note.remove();
        await NoteModel.findByIdAndDelete(noteId);
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
   }