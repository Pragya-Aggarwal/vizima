import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Upload, File, CheckCircle, Clock, XCircle, Download, Trash2, Calendar, User } from 'lucide-react';
import { Button } from '../../components/ui/button';

type Document = {
  id: string;
  name: string;
  type: 'id' | 'address' | 'income' | 'other';
  uploadedAt: string;
  status: 'verified' | 'pending' | 'rejected';
  fileUrl?: string;
};

export const DocumentsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'uploaded' | 'required'>('uploaded');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>('id');

  const mockDocuments: Document[] = [
    {
      id: '1',
      name: 'Passport.pdf',
      type: 'id',
      uploadedAt: '2023-05-15T10:30:00',
      status: 'verified',
    },
    {
      id: '2',
      name: 'Utility Bill.pdf',
      type: 'address',
      uploadedAt: '2023-06-01T14:45:00',
      status: 'pending',
    },
    {
      id: '3',
      name: 'Bank Statement.pdf',
      type: 'income',
      uploadedAt: '2023-05-20T09:15:00',
      status: 'rejected',
    },
  ];

  const requiredDocuments = [
    { id: 'id', name: 'ID Proof', description: 'Passport, Driver License, or National ID' },
    { id: 'address', name: 'Address Proof', description: 'Utility bill or bank statement (not older than 3 months)' },
    { id: 'income', name: 'Income Proof', description: 'Payslips or bank statements (last 3 months)' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    // Handle file upload logic here
    console.log('Uploading:', selectedFile, 'as', documentType);
    setShowUploadModal(false);
    setSelectedFile(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3.5 w-3.5 mr-1" /> Verified
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3.5 w-3.5 mr-1" /> Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3.5 w-3.5 mr-1" /> Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'id':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'address':
        return <FileText className="h-5 w-5 text-purple-500" />;
      case 'income':
        return <FileText className="h-5 w-5 text-green-500" />;
      default:
        return <File className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className=" bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">My Documents</h1>
          </div>
          
          <div className="mt-4 flex border-b">
            <button
              onClick={() => setActiveTab('uploaded')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'uploaded'
                  ? 'border-b-2 border-green-500 text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              My Documents
            </button>
            <button
              onClick={() => setActiveTab('required')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'required'
                  ? 'border-b-2 border-green-500 text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Required Documents
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {activeTab === 'uploaded' ? (
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button 
                onClick={() => setShowUploadModal(true)}
                className="flex items-center"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>

            {mockDocuments.length > 0 ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {mockDocuments.map((doc) => (
                    <li key={doc.id} className="px-6 py-4 hover:bg-gray-50">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            {getDocumentIcon(doc.type)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                            <div className="text-sm text-gray-500">
                              Uploaded on {new Date(doc.uploadedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 sm:mt-0 flex items-center space-x-4">
                          {getStatusBadge(doc.status)}
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No documents uploaded</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You haven't uploaded any documents yet.
                </p>
                <div className="mt-6">
                  <Button onClick={() => setShowUploadModal(true)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Your First Document
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-6 py-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Required Documents</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Please upload the following documents to complete your profile verification.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {requiredDocuments.map((doc) => (
                    <li key={doc.id} className="px-6 py-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            {getDocumentIcon(doc.id as any)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                            <div className="text-sm text-gray-500">{doc.description}</div>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setDocumentType(doc.id);
                            setShowUploadModal(true);
                          }}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-6 py-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Document Guidelines</h3>
              </div>
              <div className="border-t border-gray-200 px-6 py-5">
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                  <li>Ensure all documents are clear and legible</li>
                  <li>Accepted formats: PDF, JPG, PNG (max 5MB)</li>
                  <li>Documents must be valid and not expired</li>
                  <li>Make sure all four corners of documents are visible</li>
                  <li>File names should not contain special characters</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Upload Document</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="document-type" className="block text-sm font-medium text-gray-700 mb-1">
                    Document Type
                  </label>
                  <select
                    id="document-type"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                  >
                    <option value="id">ID Proof</option>
                    <option value="address">Address Proof</option>
                    <option value="income">Income Proof</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, JPG, PNG up to 5MB
                      </p>
                    </div>
                  </div>
                  {selectedFile && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFile(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!selectedFile}
                className="bg-green hover:bg-green-600"
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};