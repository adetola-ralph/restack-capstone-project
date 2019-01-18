import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import CategoryItemModel from '../model/Category';

if (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'staging') {
  dotenv.config({
    silent: true,
    debug: true,
    path: path.join(__dirname, '../../.env'),
  });
}

const mockData = [
  {
    title: 'installing git',
    instructions: [
      {
        title: 'Install git on macOS with Homebrew',
        command: 'brew install git',
      },
      {
        title: 'Install git on Debian-based linux',
        command: 'sudo apt-get install git',
      },
      {
        title: 'Install git on Windows with Chocolatey',
        command: 'choco install git',
      },
    ],
  },
  {
    title: 'configuration',
    instructions: [
      {
        title: 'Sets the name you want attached to your commit transaction',
        command: 'git config --global user.name [name]',
      },
      {
        title: 'Sets the email you want atached to your commit transactions',
        command: 'git config --global user.email [email address]',
      },
      {
        title: 'Enables helpful colorization of command line output',
        command: 'git config --global color.ui auto',
      },
    ],
  },
  {
    title: 'create repositories',
    instructions: [
      {
        title: 'Creates a new local repository with the specified name',
        command: 'git init [project-name]',
      },
      {
        title: 'Downloads a project and its entire version history',
        command: 'git clone [url]',
      },
    ],
  },
  {
    title: 'make changes',
    instructions: [
      {
        title: 'Lists all new or modified files to be commited',
        command: 'git status',
      },
      {
        title: 'Shows file differences not yet staged',
        command: 'git diff',
      },
      {
        title: 'Add the specified file to the staging area',
        command: 'git add [file]',
      },
      {
        title: 'Shows file differences between staging and the last file version',
        command: 'git diff --staged',
      },
      {
        title: 'Unstages the file, but preserve its contents',
        command: 'git reset [file]',
      },
      {
        title: 'Records staged snapshots in version history',
        command: 'git commit -m [descriptive message]',
      },
    ],
  },
  {
    title: 'moving and removing files',
    instructions: [
      {
        title: 'Deletes the file from the working directory and stages the deletion',
        command: 'git rm [file]',
      },
      {
        title: 'Removes the file from version control but preserves the file locally',
        command: 'git rm --cached [file]',
      },
      {
        title: 'Renames the file',
        command: 'git mv [from] [to]',
      },
    ],
  },
];

const insertCateoryItems = (_mockData) => {
  const dbUrl = process.env.MONGODB_URI;
  mongoose.connect(dbUrl, { useNewUrlParser: true });
  const db = mongoose.connection;

  db.once('open', () => {
    console.log('Database connection successful');

    CategoryItemModel.create(_mockData).then(() => {
      console.log('Finished creating mock data');
      db.close();
    }).catch((err) => {
      console.log(err);
      db.close();
    });
  });
};

export default insertCateoryItems;

insertCateoryItems(mockData);
