require 'spec_helper'

class ExamplePackage < Kosmos::Package
  title 'Example'
  aliases 'specimen', 'illustration'

  url 'http://www.example.com/releases/release-0-1.zip'
end

describe Kosmos::Package do
  let(:example_url) { 'http://www.example.com/releases/release-0-1.zip' }

  subject { ExamplePackage }

  it 'resolves the url as a uri' do
    expect(subject.uri).to eq URI(example_url)
  end

  it 'has a full name' do
    expect(subject.title).to eq 'Example'
  end

  describe 'downloading' do
    let(:example_zip) { File.read('spec/fixtures/example.zip') }
    let(:redirected_url) { 'http://example.com/latest' }

    before do
      stub_request(:get, example_url).to_return(body: example_zip)
      stub_request(:get, redirected_url).
        to_return(status: 301, headers: {'Location' => example_url})

      ExamplePackage.url redirected_url
    end

    it 'downloads from the url' do
      download_file = subject.send(:download!)
      expect(File.read(download_file)).to eq example_zip
    end

    it 'unzips the contents' do
      unzipped_dir = subject.send(:unzip!)

      expect(Dir.entries(unzipped_dir)).to include('tmp')
      expect(File.read(File.join(unzipped_dir, 'tmp', 'example.txt'))).
        to eq "Hello, world!\n"
    end
  end

  describe '#normalize_for_find' do
    it 'converts all to lowercase' do
      expect(Kosmos::Package.normalize_for_find('eXaMpLe')).to eq 'example'
    end

    it 'converts spaces to dashes' do
      expect(Kosmos::Package.normalize_for_find('many words')).
        to eq 'many-words'
    end
  end

  describe '#find' do
    it 'finds a package by name' do
      expect(Kosmos::Package.find('Example')).to eq ExamplePackage
    end

    it 'finds a package by alias' do
      expect(Kosmos::Package.find('specimen')).to eq ExamplePackage
    end
  end
end
