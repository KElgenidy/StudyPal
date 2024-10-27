from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_chroma import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_ollama import ChatOllama, OllamaEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import CrossEncoderReranker
from langchain_community.cross_encoders import HuggingFaceCrossEncoder
from langchain_core.tools import Tool
from langgraph.prebuilt import create_react_agent
from langgraph.prebuilt import ToolNode
from langchain_core.documents import Document
import chromadb
import os


class StudyPal:
    def __init__(self):
        self.llm = ChatOllama(model="llama3.2", stop=["<|eot_id|>"], temperature=0.1, top_k=10, top_p=0.5)
        self.embeddings = OllamaEmbeddings(model="mxbai-embed-large")
        self.reranker = HuggingFaceCrossEncoder(model_name="mixedbread-ai/mxbai-rerank-large-v1")
        self.compressor = CrossEncoderReranker(model=self.reranker, top_n=3)
        self.documents = PyPDFDirectoryLoader("./Data", recursive=True).load()
        self.texts = RecursiveCharacterTextSplitter(chunk_size=1500, chunk_overlap=500).split_documents(self.documents)
        self.retriever = self.create_or_load_index()
        self.rerank_retriever = ContextualCompressionRetriever(base_compressor=self.compressor, base_retriever=self.retriever)


    
    def create_or_load_index(self):
        persist_directory = "./langchainDB"
        collection_name = "langchain"
        if os.path.exists(persist_directory):
            print("Loading index from disk...")
            vector_store = Chroma(persist_directory=persist_directory, embedding_function=self.embeddings, collection_name=collection_name)
        else:
            print("Creating new index...")
            vector_store = Chroma.from_documents(documents=self.texts, collection_name=collection_name, embedding=self.embeddings, persist_directory=persist_directory)

        return vector_store.as_retriever(search_kwargs = {'k':2})
        
    def format_docs(docs: list[Document]) -> str:
        return "\n\n".join(d.page_content for d in docs)

    def qa_tool(self, query):

        docs = self.rerank_retriever.invoke(query)
        context = "\n\n".join(d.page_content for d in docs)

        qa_prompt = ChatPromptTemplate.from_messages([
            ("system", "You are teaching assistant tutor that helps students with their questions. Use the the following context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. Given context: {context}"),
            ("human", "Question: {query}"),
        ])

        return qa_prompt.invoke({
            "context": context,
            "query": query
        })
    
    def summary_tool(self, query):

        docs = self.rerank_retriever.invoke(query)
        context = "\n\n".join(d.page_content for d in docs)

        summary_prompt = ChatPromptTemplate.from_messages(
            [("system", "Write a detailed and concise bullet point summary of the following:\n\n{context}  CONCISE SUMMARY IN BULLET POINTS:"),
            ("human", "{query}")
            ])
        

        return summary_prompt.invoke({
            "context": context,
            "query": query
        }) 

    def quiz_tool(self, query):

        docs = self.rerank_retriever.invoke(query)
        context = "\n\n".join(d.page_content for d in docs)

        quiz_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", '''You are an expert quiz maker. Given the topic: ${context}, create 10 multiple-choice questions (MCQs) with 4 options (option A, option B, option C, option D) for each question. Provide the correct answer : right option option for each question. Make sure the questions are not repeated and are different and not similar. Format the output exactly as follows:
            Question
            option A
            option B
            option C
            option D
            answer : right option
        '''),
            ("user", "{query}")
        ])

        return quiz_prompt.invoke({
            "context": context,
            "query": query
        }) 
    
    def flashcard_tool(self, query):

        docs = self.rerank_retriever.invoke(query)
        context = "\n\n".join(d.page_content for d in docs)

        flash_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", '''The following is the context {context}
            Based on this list of docs, please pick out the major CONCEPTS, TERMS, and DEFINITIONS that are important in the document. Take these and distill it into a final, consolidated list of 10 definitions and concepts, in the format of flashcards. Please provide the final list as a FULLY VALID JSON LIST, NOT a dictionary. Format exactly as follows:
            CONCEPT/TERM/DEFINITION
            Closed sentence(s) with definition or explanation.
        '''),
            ("user", "{query}")
        ])

        return flash_prompt.invoke({
            "context": context,
            "query": query
        }) 
    
    def get_react_agent(self):
        tools = [
            Tool(name = 'summarizer',
                func = self.summary_tool,
                description ='Summarizes a given topic or context into bullet points.'),

            Tool(name = 'Q&A',
                func = self.qa_tool,
                description='Useful for when you need to answer questions about the documents'),

            Tool(name='quiz', 
                func= self.quiz_tool,
                description='Generates MCQ quiz on given topic'), 
            
            Tool(name='flashcards',
                func=self.flashcard_tool,
                description="Generates flashcards on a given topic or context given by the user")
        ]

        return create_react_agent(
            model=self.llm,
            tools=ToolNode(tools),
            # checkpointer=memory,
        )

    # def update_kb_from_uploaded_file(self, file_content, file_name):
    #     new_document = Document(text=file_content, metadata={"file_name": file_name})
    #     new_nodes = self.parser.get_nodes_from_documents([new_document])
    #     self.index.insert_nodes(new_nodes)

