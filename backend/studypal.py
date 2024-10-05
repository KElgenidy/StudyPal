from llama_index.core import SimpleDirectoryReader, Settings, VectorStoreIndex, Document
from llama_index.core.node_parser import LangchainNodeParser
from langchain.text_splitter import RecursiveCharacterTextSplitter

from llama_index.llms.ollama import Ollama
from llama_index.embeddings.ollama import OllamaEmbedding
from llama_index.core.postprocessor import SentenceTransformerRerank

from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import StorageContext
import chromadb



class StudyPal:
    def __init__(self):
        self.llm = Ollama(model="llama3.2", temperature=0.2)
        self.embeddings = OllamaEmbedding("mxbai-embed-large")
        self.rerank = SentenceTransformerRerank( model="mixedbread-ai/mxbai-rerank-base-v1", top_n=3)
        self.chroma_client = chromadb.PersistentClient(path="./db")
        self.chroma_collection = self.chroma_client.get_or_create_collection(name="studypal_collection")
        self.vector_store = ChromaVectorStore(chroma_collection=self.chroma_collection)
        self.storage_context = StorageContext.from_defaults(vector_store=self.vector_store)
        self.documents = SimpleDirectoryReader('./course').load_data()
        self.parser = LangchainNodeParser(RecursiveCharacterTextSplitter(chunk_size=250, chunk_overlap=50));
        self.index = self.create_or_load_index()

    
    def create_or_load_index(self):
        if self.chroma_collection.count() == 0:
            nodes = self.parser.get_nodes_from_documents(self.documents)
            return VectorStoreIndex(nodes=nodes, embed_model=self.embeddings, storage_context=self.storage_context)
        else:
            return VectorStoreIndex.from_vector_store(self.vector_store, embed_model=self.embeddings)

    def query(self, query: str):
        query_engine = self.index.as_query_engine(llm=self.llm, similarity_top_k=40, node_postprocessors=[self.rerank])
        response =  query_engine.query(query)
        return response.response

    def update_kb_from_uploaded_file(self, file_content, file_name):
        new_document = Document(text=file_content, metadata={"file_name": file_name})
        new_nodes = self.parser.get_nodes_from_documents([new_document])
        self.index.insert_nodes(new_nodes)

