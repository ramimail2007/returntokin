'use client';
import { useState } from 'react';
import { Camera, Upload, Calendar, Clock, ArrowRight, Search, Shield } from 'lucide-react';
import { Button, Badge, Card, SectionHeading } from '@/components/ui';

export default function AIToolsPage() {
  const [activeTab, setActiveTab] = useState<'face' | 'age'>('face');
  const [faceResult, setFaceResult] = useState<any>(null);
  const [ageResult, setAgeResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFaceMatch = async () => {
    setLoading(true);
    // In production: POST /api/ai/match-faces
    setTimeout(() => {
      setFaceResult({
        score: 0.78,
        threshold_met: true,
        confidence: 'medium',
        assessment: 'probable',
        analysis: 'Similar facial structure, eye spacing, and jawline. Age difference appears consistent with 5-7 year gap.',
        features: ['Similar eye shape', 'Matching jawline contour', 'Consistent nose bridge'],
        age_estimate: '5-7 years',
      });
      setLoading(false);
    }, 2000);
  };

  const handleAgeProgress = async () => {
    setLoading(true);
    setTimeout(() => {
      setAgeResult({
        age_progression_description: 'At age 35, the individual likely exhibits more defined facial features with slight softening of jawline. Skin may show mild aging signs around eyes and forehead. Hair may have thinned slightly. The distinctive eye shape and smile remain clearly recognizable.',
        key_unchanged_features: ['Eye shape and spacing', 'Smile pattern', 'Ear shape', 'Nose structure'],
        confidence: 'medium',
        distinguishing_marks_likely_persistent: ['Facial structure', 'Birthmark pattern if present'],
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-12 md:py-16">
      <SectionHeading tag="AI Tools" title="Forensic Intelligence" />
      <p className="text-text-secondary text-sm -mt-6 mb-8">AI-assisted analysis tools for authorized users. All results require human review.</p>

      <div className="flex gap-2 mb-6">
        <button onClick={() => setActiveTab('face')} className={`px-4 py-2 text-sm font-semibold rounded-[10px] transition-colors ${activeTab === 'face' ? 'bg-navy text-white' : 'bg-white border border-border text-text-secondary hover:bg-gray-50'}`}>
          <Search size={14} className="inline mr-1.5" /> Face Matching
        </button>
        <button onClick={() => setActiveTab('age')} className={`px-4 py-2 text-sm font-semibold rounded-[10px] transition-colors ${activeTab === 'age' ? 'bg-navy text-white' : 'bg-white border border-border text-text-secondary hover:bg-gray-50'}`}>
          <Calendar size={14} className="inline mr-1.5" /> Age Progression
        </button>
      </div>

      {activeTab === 'face' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-sm font-bold text-navy mb-4">Source Image</h3>
            <div className="border-2 border-dashed border-border rounded-[14px] p-8 text-center hover:border-teal/30 transition-colors cursor-pointer">
              <Camera size={32} className="mx-auto text-text-muted mb-2" />
              <p className="text-sm text-text-muted">Upload missing person photo</p>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-bold text-navy mb-4">Candidate Image</h3>
            <div className="border-2 border-dashed border-border rounded-[14px] p-8 text-center hover:border-teal/30 transition-colors cursor-pointer">
              <Upload size={32} className="mx-auto text-text-muted mb-2" />
              <p className="text-sm text-text-muted">Upload sighting or found person photo</p>
            </div>
          </Card>
          <div className="lg:col-span-2">
            <Button variant="primary" onClick={handleFaceMatch} disabled={loading} className="w-full">
              {loading ? 'Analyzing...' : 'Compare Faces'}
            </Button>
          </div>
          {faceResult && (
            <div className="lg:col-span-2 space-y-4 animate-fade-in">
              <Card className="p-5 border-l-4 border-l-teal">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-navy">Match Result</h3>
                  <Badge variant={faceResult.threshold_met ? 'success' : 'warning'}>
                    {faceResult.threshold_met ? 'Threshold Met' : 'Below Threshold'}
                  </Badge>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mb-3">
                  <div><div className="text-xs text-text-muted">Similarity Score</div><div className="text-xl font-bold text-navy">{Math.round(faceResult.score * 100)}%</div></div>
                  <div><div className="text-xs text-text-muted">Assessment</div><div className="text-sm font-semibold text-navy capitalize">{faceResult.assessment}</div></div>
                  <div><div className="text-xs text-text-muted">Confidence</div><div className="text-sm font-semibold text-navy capitalize">{faceResult.confidence}</div></div>
                </div>
                <p className="text-sm text-text-secondary">{faceResult.analysis}</p>
                {faceResult.features?.length > 0 && (
                  <div className="mt-3"><div className="text-xs text-text-muted mb-1">Matching features:</div><div className="flex flex-wrap gap-2">{faceResult.features.map((f: string) => <span key={f} className="text-xs bg-teal-light text-teal px-2 py-1 rounded-full">{f}</span>)}</div></div>
                )}
              </Card>
            </div>
          )}
        </div>
      )}

      {activeTab === 'age' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-sm font-bold text-navy mb-4">Upload Photo</h3>
            <div className="border-2 border-dashed border-border rounded-[14px] p-8 text-center hover:border-teal/30 transition-colors cursor-pointer mb-4">
              <Camera size={32} className="mx-auto text-text-muted mb-2" />
              <p className="text-sm text-text-muted">Upload a recent photo of the person</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium text-navy mb-1">Current Age</label><input type="number" defaultValue={8} className="w-full px-3 py-2 border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" /></div>
              <div><label className="block text-xs font-medium text-navy mb-1">Target Age</label><input type="number" defaultValue={35} className="w-full px-3 py-2 border border-border rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-teal/30" /></div>
            </div>
            <Button variant="primary" className="w-full mt-4" onClick={handleAgeProgress} disabled={loading}>
              {loading ? 'Processing...' : 'Generate Age Progression'}
            </Button>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-bold text-navy mb-4">Age Progression Result</h3>
            {ageResult ? (
              <div className="space-y-4 animate-fade-in">
                <Badge variant={ageResult.confidence === 'high' ? 'success' : 'warning'}>Confidence: {ageResult.confidence}</Badge>
                <p className="text-sm text-text-secondary leading-relaxed">{ageResult.age_progression_description}</p>
                <div><div className="text-xs text-text-muted mb-1">Key unchanged features:</div>
                  <div className="flex flex-wrap gap-2">{ageResult.key_unchanged_features?.map((f: string) => <span key={f} className="text-xs bg-teal-light text-teal px-2 py-1 rounded-full">{f}</span>)}</div>
                </div>
              </div>
            ) : (
              <div className="text-center text-sm text-text-muted py-12">
                <Clock size={32} className="mx-auto mb-2 text-text-muted/50" />
                Upload a photo and set age parameters to generate a forensic age progression description.
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}