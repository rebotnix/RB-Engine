'use strict';

const common = require('../../common');

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const blockedFile = process.env.BLOCKEDFILE;
const blockedFileURL = new URL('file://' + process.env.BLOCKEDFILE);
const blockedFolder = process.env.BLOCKEDFOLDER;
const allowedFolder = process.env.ALLOWEDFOLDER;
const regularFile = __filename;

// fs.readFile
{
  assert.throws(() => {
    fs.readFile(blockedFile, () => {});
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  }));
  assert.throws(() => {
    fs.readFile(blockedFileURL, () => {});
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  }));
}

// fs.createReadStream
{
  assert.rejects(() => {
    return new Promise((_resolve, reject) => {
      const stream = fs.createReadStream(blockedFile);
      stream.on('error', reject);
    });
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  })).then(common.mustCall());
  assert.rejects(() => {
    return new Promise((_resolve, reject) => {
      const stream = fs.createReadStream(blockedFileURL);
      stream.on('error', reject);
    });
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  })).then(common.mustCall());

  assert.rejects(() => {
    return new Promise((_resolve, reject) => {
      const stream = fs.createReadStream(blockedFile);
      stream.on('error', reject);
    });
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  })).then(common.mustCall());
}

// fs.stat
{
  assert.throws(() => {
    fs.stat(blockedFile, () => {});
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  }));
  assert.throws(() => {
    fs.stat(blockedFileURL, () => {});
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  }));
  assert.throws(() => {
    fs.stat(path.join(blockedFolder, 'anyfile'), () => {});
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(path.join(blockedFolder, 'anyfile')),
  }));

  // doesNotThrow
  fs.stat(regularFile, (err) => {
    assert.ifError(err);
  });
}

// fs.access
{
  assert.throws(() => {
    fs.access(blockedFile, fs.constants.R_OK, () => {});
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  }));
  assert.throws(() => {
    fs.access(blockedFileURL, fs.constants.R_OK, () => {});
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  }));
  assert.throws(() => {
    fs.access(path.join(blockedFolder, 'anyfile'), fs.constants.R_OK, () => {});
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(path.join(blockedFolder, 'anyfile')),
  }));

  // doesNotThrow
  fs.access(regularFile, fs.constants.R_OK, (err) => {
    assert.ifError(err);
  });
}

// fs.copyFile
{
  assert.throws(() => {
    fs.copyFile(blockedFile, path.join(blockedFolder, 'any-other-file'), () => {});
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  }));
  assert.throws(() => {
    fs.copyFile(blockedFileURL, path.join(blockedFolder, 'any-other-file'), () => {});
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  }));
  assert.throws(() => {
    fs.copyFile(blockedFile, path.join(__dirname, 'any-other-file'), () => {});
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  }));
}

// fs.cp
{
  assert.throws(() => {
    fs.cpSync(blockedFile, path.join(blockedFolder, 'any-other-file'));
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    // cpSync calls statSync before reading blockedFile
    resource: path.toNamespacedPath(blockedFolder),
  }));
  assert.throws(() => {
    fs.cpSync(blockedFileURL, path.join(blockedFolder, 'any-other-file'));
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    // cpSync calls statSync before reading blockedFile
    resource: path.toNamespacedPath(blockedFolder),
  }));
  assert.throws(() => {
    fs.cpSync(blockedFile, path.join(__dirname, 'any-other-file'));
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(__dirname),
  }));
}

// fs.open
{
  assert.throws(() => {
    fs.open(blockedFile, 'r', () => {});
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  }));
  assert.throws(() => {
    fs.open(blockedFileURL, 'r', () => {});
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  }));
  assert.throws(() => {
    fs.open(path.join(blockedFolder, 'anyfile'), 'r', () => {});
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(path.join(blockedFolder, 'anyfile')),
  }));

  // doesNotThrow
  fs.open(regularFile, 'r', (err) => {
    assert.ifError(err);
  });

  // Extra flags should not enable trivially bypassing all restrictions.
  // See https://github.com/nodejs/node/issues/47090.
  assert.throws(() => {
    fs.openSync(blockedFile, fs.constants.O_RDONLY | fs.constants.O_NOCTTY);
  }, {
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
  });
  assert.throws(() => {
    fs.open(blockedFile, fs.constants.O_RDWR | 0x10000000, common.mustNotCall());
  }, {
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
  });
}

// fs.opendir
{
  assert.throws(() => {
    fs.opendir(blockedFolder, (err) => {
      assert.ifError(err);
    });
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFolder),
  }));
  // doesNotThrow
  fs.opendir(allowedFolder, (err, dir) => {
    assert.ifError(err);
    dir.closeSync();
  });
}

// fs.readdir
{
  assert.throws(() => {
    fs.readdir(blockedFolder, () => {});
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFolder),
  }));

  // doesNotThrow
  fs.readdir(allowedFolder, (err) => {
    assert.ifError(err);
  });
}

// fs.watch
{
  assert.throws(() => {
    fs.watch(blockedFile, () => {});
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  }));

  // doesNotThrow
  fs.readdir(allowedFolder, (err) => {
    assert.ifError(err);
  });
}

// fs.watchFile
{
  assert.throws(() => {
    fs.watchFile(blockedFile, common.mustNotCall());
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  }));
  assert.throws(() => {
    fs.watchFile(blockedFileURL, common.mustNotCall());
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  }));
}

// fs.rename
{
  assert.throws(() => {
    fs.rename(blockedFile, 'newfile', () => {});
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  }));
  assert.throws(() => {
    fs.rename(blockedFileURL, 'newfile', () => {});
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  }));
}

// fs.openAsBlob
{
  assert.throws(() => {
    fs.openAsBlob(blockedFile);
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  }));
  assert.throws(() => {
    fs.openAsBlob(blockedFileURL);
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  }));
}

// fs.exists
{
  // It will return false (without performing IO) when permissions is not met
  fs.exists(blockedFile, (exists) => {
    assert.equal(exists, false);
  });
  fs.exists(blockedFileURL, (exists) => {
    assert.equal(exists, false);
  });
}

// fs.statfs
{
  assert.throws(() => {
    fs.statfs(blockedFile, () => {});
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  }));
  assert.throws(() => {
    fs.statfs(blockedFileURL, () => {});
  }, common.expectsError({
    code: 'ERR_ACCESS_DENIED',
    permission: 'FileSystemRead',
    resource: path.toNamespacedPath(blockedFile),
  }));
}