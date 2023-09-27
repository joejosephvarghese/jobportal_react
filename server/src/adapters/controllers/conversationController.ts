import { Request, Response } from "express";
import { ConversationInterface } from "../../types/messengerInterface";
import { ConversationModel } from "../../frameworkes/database/models/conversationModel";
import { ConversationRepositoryMongoDB } from "../../frameworkes/database/mongoDb/repositories/conversationRepositioryMongoDB";
import { ConversationDbInterface } from "../../app/repositories/conversationDbRepository";
import { newConversation, getConversation } from "../../app/repositories/useCases/messenger/conversation";
import expressAsyncHandler from "express-async-handler";

const conversationController = (
  conversationDbRepository: ConversationDbInterface,
  conversationDbRepositoryImpl: ConversationRepositoryMongoDB,
  conversationModel: ConversationModel
) => {
  const dbRepositoryConversation = conversationDbRepository(
    conversationDbRepositoryImpl(conversationModel)
  );

  const createConversation = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const conversation: ConversationInterface = {
        members: [req?.body?.senderId, req?.body?.receiverId],
      };
      const newCon = await newConversation(conversation, dbRepositoryConversation);
      res.json(newCon);
    }
  );

  const findConversation = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id ?? '';
      if(!id) {
        throw new Error ('id not found');
      } 
      const conversation = await getConversation(id, dbRepositoryConversation);
      res.json(conversation);
    }
  )

  return {
    createConversation,
    findConversation,
  }
};

export default conversationController;